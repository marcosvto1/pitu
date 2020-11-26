import React from "react";
import Header from "../../components/Header";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StatsContainer } from "./styles";

import ShortnedService from "../../services/shortenerService";

class RedirectPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      url: "",
      errorMessage: "",
      intervalId: "",
      currentCount: 10,
    };
  }

  async componentDidMount() {
    this.loadLink();
    var intervalId = setInterval(async () => {
      if (this.state.currentCount - 1 > -1) {
        this.setState({ currentCount: parseInt(this.state.currentCount) - 1 });
      } else {
        clearInterval(this.state.intervalId);
      }
    }, 1000);
    this.setState({ intervalId });
  }

  async loadLink() {
    const { code } = this.props.match.params;

    try {
      const service = new ShortnedService();
      const { url } = await service.getLink(code);
      if (url) {
        this.setState({ url });
      } else {
        this.setState({errorMessage: 'Ops, Link não encontrado'})
      }
    } catch (error) {
      this.setState({errorMessage: 'Ops, Link não encontrado'})
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    const { errorMessage, currentCount } = this.state;
    return (
      <Container>
     
        {errorMessage ? (
          <>
            <Header>Seu novo encurtador de urls. :)</Header>
            <StatsContainer className="text-center">
              <FontAwesomeIcon
                size="3x"
                color="#f8d7da"
                icon="exclamation-triangle"
              />
              <p className="m-3">{errorMessage}</p>
              <a className="btn btn-primary" href="/">
                Encurtar nova URL
              </a>
            </StatsContainer>
          </>
        ) : (
          <>
            <Header></Header>
            <h1 className="text-center">
          {currentCount === 0
            ? (window.location = this.state.url)
            : currentCount}
        </h1>
            <p className="text-center">Redirecionando...</p>
          </>
        )}
      </Container>
    );
  }
}

export default RedirectPage;
