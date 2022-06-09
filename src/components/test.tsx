import Peer from 'peerjs';
import { useEffect, useRef, useState } from 'react';

const Testi = () => {
  const [peerId, setPeerId] = useState('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const currentUserVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<(HTMLVideoElement | null)[]>([]);
  const peerInstance = useRef<Peer | null>(null);

  useEffect(() => {
    const peer = new Peer();
    peerInstance.current = peer;

    peer.on('open', (id) => {
      setPeerId(id);
    });

    peer.on('call', async (call) => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (!currentUserVideoRef.current) return;
      currentUserVideoRef.current.srcObject = stream;
      currentUserVideoRef.current.play();

      call.answer(stream);
      call.on('stream', (remoteStream) => {
        if (!remoteVideoRef.current[0]) return;
        
        remoteVideoRef.current[0].srcObject = remoteStream;
        remoteVideoRef.current[0].play();
      });
    });
  }, []);

  const call = async (remotePeerId: string) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    if (!currentUserVideoRef.current) return;
    currentUserVideoRef.current.srcObject = stream;
    currentUserVideoRef.current.play();

    if (!peerInstance.current) return;

    const call = peerInstance.current.call(remotePeerId, stream);

    call.on('stream', (remoteStream) => {
      if (!remoteVideoRef.current[0]) return;

      remoteVideoRef.current[0].srcObject = remoteStream;
      remoteVideoRef.current[0].play();
    });
  };

  return (
    <div className="App">
      <h1>Current user id is {peerId}</h1>
      <input
        type="text"
        value={remotePeerIdValue}
        onChange={(e) => setRemotePeerIdValue(e.target.value)}
      />
      <button onClick={() => call(remotePeerIdValue)}>Call</button>
      <div>
        <video ref={currentUserVideoRef} />
      </div>
      <div>
        <video ref={(el) => (remoteVideoRef.current[0] = el)} />
      </div>
    </div>
  );
};

export default Testi;
