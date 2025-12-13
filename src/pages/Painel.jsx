import ProgressRing from "../components/ProgressRing";

export default function Painel() {
  return (
    <div>
      <h1>Olá</h1>

      <ProgressRing
        value={12}
        label="Ambiente configurado"
      />

      {/* resto do painel continua igual */}
    </div>
  );
}
