import React from "react";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Header from "../../components/Header";
import { ContentContainer, Form, AdsBlock } from "./styles";
import ShortenedSerice from "../../services/shortenerService";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      url: "",
      code: "",
      errorMessage: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const url = this.state.url;

    this.setState({ isLoading: true, errorMessage: "" });

    if (!url) {
      this.setState({
        isLoading: false,
        errorMessage: "Informe uma url para encurtar",
      });
    }
    {
      try {
        const service = new ShortenedSerice();
        const result = await service.generate({ url });

        this.setState({ isLoading: false, code: result.code });
      } catch (error) {
        this.setState({
          isLoading: false,
          errorMessage:
            "Ops, ocorreu um erro ao tentar encurtar a url. Tente novamente mais tarde",
        });
      }
    }
  };

  copyToClipBoart = () => {
    const element = this.inputURL;
    element.select();
    document.execCommand("copy");
  };

  render() {
    const { isLoading, errorMessage, code } = this.state;

    return (
      <Container>
        <Header title={"Header"}>Seu novo encurtador de URL. :)</Header>
        <ContentContainer>
          <Form onSubmit={this.handleSubmit}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Informe sua URL para encurtar"
                defaultValue=""
                onChange={(e) => this.setState({ url: e.target.value })}
              ></FormControl>
              <InputGroup.Append>
                <Button variant="primary" type="submit">
                  Encurtar
                </Button>
              </InputGroup.Append>
            </InputGroup>

            {isLoading ? (
              <Spinner animation="border" />
            ) : (
              code && (
                <>
                  <InputGroup>
                    <FormControl
                      autoFocus={true}
                      defaultValue={`http://localhost:3000/${code}/stats`}
                      ref={(input) => (this.inputURL = input)}
                    ></FormControl>
                    <InputGroup.Append>
                      <Button
                        variant="outline-secondary"
                        onClick={() => this.copyToClipBoart()}
                      >
                        Copiar
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                  <p>
                    Para acompanhar as estatísticas acesse http://localhost:3000/{code}/stats
                  </p>
                </>
              )
            )}

            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          </Form>
        </ContentContainer>

        <ContentContainer>
          <AdsBlock>Adense</AdsBlock>
        </ContentContainer>

      </Container>
    );
  }
}

export default HomePage;
