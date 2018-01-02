import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      })

      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error });
      })
    }

    componentWillUnmount() {
      // console.log('[Will Unmount]', this.reqInterceptor, this.resInterceptor)
      // clean up the interceptors...
      axios.interceptors.request.eject(this.reqInterceptor)
      axios.interceptors.response.eject(this.resInterceptor)
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null })
    }

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    };
  };
}

export default withErrorHandler;

// show it, get it working....
// import React from 'react';

// import Modal from '../../components/UI/Modal/Modal';
// import Aux from '..//Aux/Aux';

// const withErrorHandler = (WrappedComponent) => {
//   return (props) => {
//     return (
//       <Aux>
//         <Modal show>
//           Something didn't work!
//         </Modal>
//         <WrappedComponent {...props} />
//       </Aux>
//     );
//   };
// }

// export default withErrorHandler;
