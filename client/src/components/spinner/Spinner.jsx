import './spinner.css';

export default function Spinner() {
  return (
    <>
      <div className="fixed w-full h-screen flex items-center justify-center z-10 top-0 left-0">
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}
