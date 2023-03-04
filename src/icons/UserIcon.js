function UserIcon(props) {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 512 512"
      fill={props.fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M256 289c47.7 0 86.5-38.8 86.5-86.5S303.7 116 256 116s-86.5 38.8-86.5 86.5S208.3 289 256 289zM256 333c-61.8 0-186 31.5-186 93v20h372v-20c0-61.5-124.2-93-186-93z" />
    </svg>
  );
}

export default UserIcon;
