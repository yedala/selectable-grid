import GridLayout from "./Grid";
import "./styles.css";
export default function App() {
  return (
    <div className="App">
      <GridLayout rows={15} cols={10} />
    </div>
  );
}
