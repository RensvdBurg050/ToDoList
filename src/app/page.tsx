
export default function Home() {

const dummyTodos = [
  { id: 1, text: "Boodschappen doen" },
  { id: 2, text: "E-mail beantwoorden" },
  { id: 3, text: "React leren" },
];




  return (
    <main>

      <div className="container">

        <h1>To Do List</h1>

        <div>
          <input type="text" placeholder="Nieuwe Taak:" />
          <button className="cursor-pointer bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            Button
          </button>
        </div>

<ul>
  {dummyTodos.map(todo => (
    <li key={todo.id}>{todo.text}</li>
  ))}
</ul>





      </div>
    </main>
  );
}