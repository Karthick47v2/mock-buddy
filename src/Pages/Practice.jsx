import React, { useEffect, useState } from "react";
import { Card, ToggleButton, ButtonGroup, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { PermissionAlert } from "../Components/permissionAlert";
import { avActions } from "../store/av-slice";
import { practiceActions } from "../store/practice-slice";
import { LivePractice } from "../Components/livePractice";

export const Practice = () => {
  const dispatch = useDispatch();

  const permission = useSelector((state) => state.av.permissionStatus);
  const record = useSelector((state) => state.av.isRecord);
  const mode = useSelector((state) => state.practice.practiceMode);

  const [isLiveAvail, setIsLiveAvail] = useState(false);

  // ask for permission on start
  useEffect(() => {
    dispatch(avActions.resetReducer());
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(() => {
        dispatch(avActions.writePermissionStatus("Accepted"));
      })
      .catch(() => {
        dispatch(avActions.writePermissionStatus("Rejected"));
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {permission === "Rejected" && <PermissionAlert />}
      <Card
        className="my-3 p-5 text-center"
        bg="dark"
        text="white"
        border="secondary"
      >
        <Card.Header>
          <ButtonGroup size="lg" role="group" className="mt-3">
            <ToggleButton
              id="presentation"
              type="radio"
              variant="outline-danger"
              value="1"
              checked={mode}
              disabled={record}
              onChange={(e) =>
                dispatch(
                  practiceActions.switchPracticeMode(
                    e.currentTarget.value === "1"
                  )
                )
              }
            >
              Live Practice
            </ToggleButton>
            <ToggleButton
              id="speech"
              type="radio"
              variant="outline-warning"
              value="0"
              checked={!mode}
              disabled={record}
              onChange={(e) =>
                dispatch(
                  practiceActions.switchPracticeMode(
                    e.currentTarget.value === "1"
                  )
                )
              }
            >
              Upload Video
            </ToggleButton>
          </ButtonGroup>
        </Card.Header>
        <Card.Body>{mode && <LivePractice />}</Card.Body>
      </Card>
    </Container>
  );
};
