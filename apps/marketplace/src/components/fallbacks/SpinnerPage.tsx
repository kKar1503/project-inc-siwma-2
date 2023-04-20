import Spinner from "../Spinner";

const SpinnerPage = () => (
  <div className="w-full h-screen flex flex-col items-center justify-center">
    <div className="w-full h-full flex flex-col gap-2 items-center justify-center max-w-md px-8">
      <Spinner />
    </div>
  </div>
);

SpinnerPage.allowNonAuthenticated = true;
SpinnerPage.allowAuthenticated = true;

export default SpinnerPage;
