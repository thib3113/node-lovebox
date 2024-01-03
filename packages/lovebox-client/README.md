# Lovebox-client

A little client allowing you to send picture to a [lovebox](https://lovebox.love/)

### Example
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


const boxWithColor = boxes.find(b => b.hasColor);
const boxWithoutColor = boxes.find(b => !b.hasColor);

/**
 * Calling sendPicture / sendOLEDPicture without box or device (forcing the function to do a request to the API),
 * will handle correct box selection => incorrect id used = error
 *
 * A good option can be to let the device empty unless you are sure, and want to be faster
 */

if(boxWithColor) {
    // use sendPicture only on a color loveBox

    // you can also force the boxId and senderId
    await client.sendPicture({
        picture: 'data:image/png;base64,iVBORw0KGgoAAAANSUh.....',
        boxId: boxWithColor,
        senderDeviceId: me.device._id
    }, boxWithColor, me.device._id);
}

if(boxWithoutColor) {
    // use sendOLEDPicture only on a N&B loveBox

    // an array of 1024 bytes, read more below
    const bytes = Buffer.from([255,255,255 ,'...'])

    // you can also force the boxId and senderId
    await client.sendOLEDPicture(
    {
        bytes,
        boxId: boxWithColor,
        senderDeviceId: me.device._id
    });
}

````

### Sending gif
sending gif is very limited .
original gif are 3 frames only .

I've tested bigger ones, and sometimes the lovebox can't read it (freeze on first frame, need reboot) / or totally crash an need a factory reset.
````typescript
await client.sendPicture({
        //picture need to contain a gif (not tested if need to be the real gif)
        picture: 'data:image/gif;base64,iVBORw0KGgoAAAANSUh.....',
        //send the gif frames
        frames: [
            'data:image/png;base64,iVBORw0KGgoAAAANSUh.....',
            'data:image/png;base64,iVBORw0KGgoAAAANSUh.....'
        ],
        boxId: boxWithColor,
        senderDeviceId: me.device._id
    }, boxWithColor, me.device._id);
````


### OLED picture
When sending OLED pictures, you need to pass an array of `1024` bytes .
This bytes will be divided in `64` rows per `128` columns,

Each row is divided by 8 bits, 1 = light off / 0 = light on (common anode)

you can use the editor [here](https://thib3113.github.io/node-lovebox/tools/editor/) to generate an example picture


### Sending gif to OLED

to send gif to OLED, you need to add another frames in the bytes array, max 3 frames (3072 bytes)

