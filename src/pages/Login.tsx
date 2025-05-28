import { Navigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

import useAlertToast from "../hooks/useAlertToast";
import { useLogin } from "../hooks/useLogin";
import useAuth from "../hooks/useAuth";

import { IFormInput } from "../api/models";

const Login = () => {
  const { logUserIn, isAuthenticated } = useAuth();
  const { notifyError } = useAlertToast();

  const loginMutation = useLogin({
    onSuccess: () => {
      logUserIn();
    },
    onError: (e: Error) => {
      notifyError(e.message);
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    loginMutation.mutate(data);
  };

  if (isAuthenticated) {
    return <Navigate to="/tito-garzoni-house" />;
  }
  return (
    <>
      <Container
        // fluid
        className="d-flex justify-content-center align-items-center  space-between"
        style={{
          height: "85vh",
        }}
      >
        <Card className="p-4 bg-primary text-white shadow-lg">
          <h3 className="text-center">Login</h3>
          <h3 className="text-center ">
            <FaLock className="text-warning" />
          </h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm={12}>
                Username
              </Form.Label>
              <Col sm={12}>
                <Form.Control
                  placeholder="Username"
                  autoComplete="current-username"
                  {...register("username", { required: true })}
                  isInvalid={!!errors.username}
                />
                {errors.username?.type === "required" && (
                  <Form.Control.Feedback type="invalid">
                    {" "}
                    Username is required
                  </Form.Control.Feedback>
                )}
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm={12}>
                Password
              </Form.Label>
              <Col sm={12} lg={12}>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  {...register("password", { required: true })}
                  isInvalid={!!errors.password}
                  className="w-100"
                />
                {errors.password?.type === "required" && (
                  <Form.Control.Feedback type="invalid">
                    {" "}
                    Password is required
                  </Form.Control.Feedback>
                )}
              </Col>
            </Form.Group>
            <Form.Group>
              <Button
                // variant="warning text-white font-weight-bold"
                type="submit"
                className="w-100 bg-secondary text-white font-weight-bold"
                disabled={loginMutation.isPending}
              >
                LOGIN
              </Button>
            </Form.Group>
          </Form>
        </Card>
      </Container>
    </>
  );
};

export default Login;
