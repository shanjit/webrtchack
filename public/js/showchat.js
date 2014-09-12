	
var video;
var localstream;
var remotstream;


$(document).ready(function() {


	$("#startchat").click(function(e) {
		humane.log("Chat Started");

/*		alert("Chat started");
*/	
	
	getMedia();



	// Send to server - beyond this.
	var text = "started";
	var json_text = JSON.stringify(text);
	var real_json_text = JSON.stringify({ x: text });                  // '{"x":5}'
					$.ajax({
						type: 'POST',
						contentType: 'application/json',
						data: real_json_text,
                        url: '/room/start',						
                        success: function(data) {
                            console.log('success');
                        }
                    });
});

		$("#endchat").click(function(e) {
		humane.log("Chat Ended");
		video.pause();	
		videoStream.stop();

	var text = "ended";
	var json_text = JSON.stringify(text);
	var real_json_text = JSON.stringify({ x: text });                  // '{"x":5}'
					$.ajax({
						type: 'POST',
						contentType: 'application/json',
						data: real_json_text,
                        url: '/room/end',						
                        success: function(data) {
                            console.log('success');
                        }
                    });
});

		$("#guide").click(function(e) {

		$('body').chardinJs('start');


                    });

});


var pc1,pc2;
var sdpConstraints = {'mandatory': {
'OfferToReceiveAudio':true,
'OfferToReceiveVideo':true }};


function getMedia() {
changeDevices();
}

function changeDevices() {
setWebcamAndMic();
}

function setWebcamAndMic() {
trace("Requesting local stream");
// Call into getUserMedia via the polyfill (adapter.js).
getUserMedia({ audio: false,
video: true }, gotStream, function() {});
}

function gotStream(stream) {
trace("Received local stream");
// Call the polyfill wrapper to attach the media stream to this element.
attachMediaStream(localVideo, stream);
localstream = stream;

createPC();
}

function createPC() {
trace("Starting call");
var servers = null;
pc1 = new RTCPeerConnection(servers);
trace("Created local peer connection object pc1");
pc1.onicecandidate = iceCallback1;
pc2 = new RTCPeerConnection(servers);
trace("Created remote peer connection object pc2");
pc2.onicecandidate = iceCallback2;
pc2.onaddstream = gotRemoteStream;

pc1.addStream(localstream);
trace("Adding Local Stream to peer connection");
pc1.createOffer(onCreateOfferSuccess, onCreateSessionDescriptionError);


}


function onCreateSessionDescriptionError(error) {
  trace('Failed to create session description: ' + error.toString());
}

function onCreateOfferSuccess(desc) {
  trace('Offer from pc1\n' + desc.sdp);
  trace('pc1 setLocalDescription start');
  pc1.setLocalDescription(desc, function() { onSetLocalSuccess(pc1); });
  trace('pc2 setRemoteDescription start');
  pc2.setRemoteDescription(desc, function() { onSetRemoteSuccess(pc2); });
  trace('pc2 createAnswer start');
  // Since the 'remote' side has no media stream we need
  // to pass in the right constraints in order for it to
  // accept the incoming offer of audio and video.
  pc2.createAnswer(onCreateAnswerSuccess, onCreateSessionDescriptionError,
                   sdpConstraints);
}

function onSetLocalSuccess(pc) {
  trace(' setLocalDescription complete');
}

function onSetRemoteSuccess(pc) {
  trace(' setRemoteDescription complete');
}

function onCreateAnswerSuccess(desc) {
  trace('Answer from pc2:\n' + desc.sdp);
  trace('pc2 setLocalDescription start');
  pc2.setLocalDescription(desc, function() { onSetLocalSuccess(pc2); });
  trace('pc1 setRemoteDescription start');
  pc1.setRemoteDescription(desc, function() { onSetRemoteSuccess(pc1); });
}


function hangup() {
trace("Ending call");
localstream.stop();
pc1.close();
pc2.close();
pc1 = null;
pc2 = null;


}

function gotRemoteStream(e) {
// Call the polyfill wrapper to attach the media stream to this element.
attachMediaStream(remoteVideo, e.stream);
trace("Received remote stream");
}

function iceCallback1(event) {
if (event.candidate) {
pc2.addIceCandidate(new RTCIceCandidate(event.candidate));
trace("Local ICE candidate: \n" + event.candidate.candidate);
}
}

function iceCallback2(event) {
if (event.candidate) {
pc1.addIceCandidate(new RTCIceCandidate(event.candidate));
trace("Remote ICE candidate: \n " + event.candidate.candidate);
}
}