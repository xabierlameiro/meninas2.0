type BooleanState = [boolean, React.Dispatch<boolean | ((prevState: boolean) => boolean)>];

type StringState = [string, React.Dispatch<React.SetStateAction<string>>];
