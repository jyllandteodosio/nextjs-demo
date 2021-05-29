import Head from "next/head";
import { Fragment } from "react";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return <Fragment>
    <Head>
      <title>React Meetups</title>
      <meta name="description" content="Hello world welcome to our page. We aim for world domination!"></meta>
    </Head>
    <MeetupList meetups={props.meetups}></MeetupList>
  </Fragment>;
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://layachanx3:ph8BLRe7d4cLiQS@cluster0.0fazi.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
