import gerationalBeep from "../assets/audios/gravitational_beep.mp3";

export function loadSound() {
  const audio = new Audio(gerationalBeep);
  audio.load();

  return () => {
    audio.currentTime = 0;
    audio.play().catch((error) => console.log("Error ao tocar audio: ", error));
  };
}
