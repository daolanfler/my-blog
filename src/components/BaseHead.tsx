const BaseHead = (props: { title?: string }) => {
  const { title = "天方夜谈" } = props;
  return (
    <>
      <title>{title}</title>
    </>
  );
};


export default BaseHead;