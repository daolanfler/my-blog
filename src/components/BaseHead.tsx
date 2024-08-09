const BaseHead = (props: { title?: string }) => {
  const { title = "天方夜坛" } = props;

  return (
    <>
      <title>{title}</title>
    </>
  );
};

export default BaseHead;
