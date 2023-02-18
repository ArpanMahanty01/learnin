let localStream;//the users audio data
let remoteStream;//the friends audio data
let peerConnection;

const servers = {
    iceServers:[
        {
            urls:['stun:stun1.l.google.com:19302','stun:stun2.l.google.com:19302']
        }
    ]
}

let init = async () =>{
    localStream= await navigator.mediaDevices.getUserMedia({video:true, audio:false})
    document.getElementById('user-1').srcObject = localStream;

    createOffer()
}

let createOffer = async()=>{
    peerConnection = new RTCPeerConnection(servers)

    remoteStream = new MediaStream()
    document.getElementById('user-2').srcObject = remoteStream;


    localStream.getTrack().forEach((track)=>{
        peerConnection.addTrack(track, localstream)
    })

    peerConnection.ontrack = (event)=>{
        event.streams[0].getTracks().forEach((track)=>{
            remoteStream.addTrack(track)
        })
    }

    peerConnection.onicecandidate = async (event)=>{
        if(event.candidate){
            console.log("new ICE candidate: ", event.candidate)
        }
    }

    let offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)

    console.log('offer:',offer)
}

init()