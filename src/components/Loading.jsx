const Loading = ({ spidermanLogo, background }) => {
  return (
    <div
      className="spiderLogoContainer"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <img src={spidermanLogo} className="spiderLogo" alt="Spiderman logo" />
    </div>
  );
};
export default Loading;
