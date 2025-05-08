import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";
import { IFormInput } from "../api/models";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const loginMutation = useLogin({
    onSuccess: () => {
      navigate("/tito-garzoni-house");
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    console.log(data);
    loginMutation.mutate(data);
  };

  return (
    <>
      <Container className="p-2">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm={2}>
              Username
            </Form.Label>
            <Col sm={10} lg={6}>
              <Form.Control
                placeholder="Username"
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
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10} lg={6}>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
                isInvalid={!!errors.password}
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
            <Button variant="outline-warning" type="submit">
              LOG IN
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};

export default Login;
