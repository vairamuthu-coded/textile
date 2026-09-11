import Stories from "./Stories";

import Posts from "./Posts";

const Feed = () => {
  return (
    <>
      <div className="d-flex bg-light ">
        <Stories />
      </div>
      <div className="d-flex   navbar-nav-scroll p-4">
        <Posts />
      </div>
    </>
  );
};

export default Feed;
