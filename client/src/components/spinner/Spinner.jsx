import './Spinner.css';

export default function Spinner() {
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}
