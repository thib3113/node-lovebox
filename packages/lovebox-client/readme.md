### Lovebox-client

A little client allowing you to send picture to a [lovebox](https://lovebox.love/)

````typescript
import { LoveBoxClient } from 'lovebox-client';

const client = new LoveBoxClient({
    email: 'foo@bar.com',
    password: 'myPassword'
});
//need to login to get a token
await client.login();

//retrieve connected user information
const me = await client.getMe();

//list paired box with current account
const boxes = await client.listBoxes();

await client.sendPicture({
    data: Buffer.from('....'),
    contentType: 'image/png'
});


// you can also force the boxId and senderId
await client.sendPicture({
    data: Buffer.from('....'),
    contentType: 'image/png'
}, boxes[0]._id, me.device._id);
````
