import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/index.css';



const apolloClient = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
      <ToastContainer
        position="bottom-left"
        transition={Slide}
        autoClose={2000}
        hideProgressBar={true}
      />
    </ApolloProvider>
  </React.StrictMode>
);
