import { NextResponse } from "next/server";
import { Client, Account, ID } from 'appwrite';

export async function POST(request) {

  const appwriteClient = new Client();
  const account = new Account(appwriteClient);

  appwriteClient
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('650308cb246a036fd8f2'); 


  const res = await request.json();

  const email = res.email;
  const password = res.password;



  try {

    const userAccount = await account.createEmailSession(email, password);


    return NextResponse.json({ success: true, userAccount });
  } catch (error) {
    console.error('User lOGIN failed:', error);

    return NextResponse.json({ success: false, error: error.message });
  }

}