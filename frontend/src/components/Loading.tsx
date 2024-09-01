import { MoonLoader } from "react-spinners"

const Loading = () => {

  const override = {
    display: "block",
    margin: "0 auto",
  };

  return (
    <MoonLoader
        color="grey"
        loading={true}
        cssOverride={override}
        size={40}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  )
}

export default Loading