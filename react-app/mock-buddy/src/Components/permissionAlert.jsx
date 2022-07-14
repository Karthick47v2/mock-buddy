import { Alert } from "react-bootstrap";

export const PermissionAlert = () => {
  return (
    <Alert variant="danger">
      <Alert.Heading> Permission denied!</Alert.Heading>
      <p>
        Mock buddy requires both Audio and Video permission in order to evaluate
        performance. Grant permssion to get full benefits...
      </p>
    </Alert>
  );
};
