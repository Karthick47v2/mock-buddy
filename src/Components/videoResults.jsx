import React from "react";
import { useSelector } from "react-redux";
import { ResultsAccordionMapper } from "./resultsAccordionMapper";

export const VideoResults = () => {
  const videoResults = useSelector((state) => state.av.videoResults);

  const videoScores = [
    {
      val: videoResults.visibility_score,
      attr: `Visibility score: `,
      expl: (
        <div>
          <h5>Why it is important?</h5>
          <p>
            Lightning is <b>critical</b>. Lightning in video scenes is an art
            and a science on its own. The presenter's face should be well lit
            and brighter than the background. People can't connect with you if
            they can't see your face.
          </p>
          <h5>How to improve?</h5>
          <ul>
            <li>
              Give remote presentations/speeches in a{" "}
              <b>well-lit environment</b>. Use natural light as much as possible
              and place the light in front of you rather than to the side or
              behind you.
            </li>
            <li>
              Make sure the light source isn't behind you, you don't want to be
              backlit.
            </li>
          </ul>
        </div>
      ),
    },
    {
      val: videoResults.posture_score,
      attr: `Eye-contact score: `,
      expl: (
        <div>
          <h5>Why it is important?</h5>
          <p>
            Having a top-notch design doesn’t mean you’re not supposed to show
            your face when presenting remotely. A majority of people consider
            <b>face-to-face interaction</b> is essential to any business
            partnership, whether through conferences or networking events. With
            virtual presentations, in-person communication will never be
            possible but you can still put a face to your name and voice as well
            as maintain eye contact through the camera.
          </p>
          <h5>How to improve?</h5>
          <ul>
            <li>
              Match the webcam with your <b>eye-level</b> to appear to be
              looking straight at your audience. Place your camera on top of
              your laptop, or place couple of books underneath the laptop in
              case your desk is too low. Always keep the laptop at a{" "}
              <b>90 degrees angle</b> so your record stay the same.
            </li>
            <li>
              Look into the camera when presenting remotely, not at yourself, at
              your slides, or at anything other than the camera. The best way to
              stop looking at your slides is to be well practiced.
            </li>
            <li>
              Avoid trying to multitask whilst you are presenting. In other
              words, don't look at your phone or look around the room you're in.
              You don't want to appear uninterested in the conversation and not
              paying attention.
            </li>
          </ul>
        </div>
      ),
    },
    {
      val: videoResults.interactivity_score,
      attr: `Interactivity score: `,
      expl: (
        <div>
          <h5>Why it is important?</h5>
          <p>
            When giving a presenting, strong, positive body language can be an
            essential tool in helping you build credibility, express your
            emotions, and connecting with your audience. It also helps your
            listeners focus more intently on you and what you're saying.
          </p>
          <h5>How to improve?</h5>
          <ul>
            <li>
              Facial expressions speak before you even say something. Have a
              <b>slight smile throughout and raise your eyebrows a little</b> to
              show your enthusiasm during the conversation.
            </li>
            <li>
              Always smile when presenting. But you also don't want to over
              smile or not at all, as it may come across as fake if you smile
              too much or cold if you don't smile at all.
            </li>
            <li>
              Use your hands when you are speaking to others during meetings.
              This can give the impression that you are engaging and
              enthusiastic about the conversation. <b>Don't sit still</b> during
              entire virtual meeting, use your hands when you are counting
              something or indicating how big or small something is.
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return <ResultsAccordionMapper scores={videoScores} />;
};
