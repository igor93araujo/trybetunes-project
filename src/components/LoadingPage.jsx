import '../index.css';

function LoadingMessage() {
  return (
    <section className="loadingComponent">
      <p className="loadingText">Carregando...</p>
      <img src="https://www.blogson.com.br/wp-content/uploads/2017/10/584b607f5c2ff075429dc0e7b8d142ef.gif" alt="logoloading" className="loadingGif" />
    </section>
  );
}

export default LoadingMessage;
