import { Alert } from "react-bootstrap";

export const PermissionRejectAlert = () => {
  return (
    <Alert variant="danger" onClose={() => console.log("Refresh")}>
      <Alert.Heading> Permission denied!</Alert.Heading>
      <p>
        Mock buddy requires both Audio and Video permission in order to evaluate
        performance. Grant permssion to get full benefits...
      </p>
    </Alert>
  );
};
