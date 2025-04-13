function BreadCrumb({ path }) {
  return (
    <>
      <p>
        HOME <span className="font-bold">&gt;</span>{" "}
        {path.toString().toUpperCase().split("/")}
      </p>
    </>
  );
}

export default BreadCrumb;
