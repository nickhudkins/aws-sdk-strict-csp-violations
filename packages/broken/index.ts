import {
  DescribeAccountAttributesCommand,
  EC2Client,
} from "@aws-sdk/client-ec2";

(async function () {
  try {
    const credentials = {
      accessKeyId: import.meta.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.AWS_SECRET_ACCESS_KEY,
      sessionToken: import.meta.env.AWS_SESSION_TOKEN,
    };
    if (Object.values(credentials).every((val) => !Boolean(val))) {
      throw new Error(
        "All Config Values Are Empty!\n Have you exported AWS_ credentials?"
      );
    }
    const client = new EC2Client({
      region: "us-east-1",
      credentials,
    });
    // Needed to be able to reproduce unsafe-eval error
    await client.send(
      new DescribeAccountAttributesCommand({
        AttributeNames: ["default-vpc"],
      })
    );
  } catch (e) {
    document.body.innerHTML = `<h1>v3.199.0 | 😭</h1><pre>${e}</pre>`;
  }
})();
