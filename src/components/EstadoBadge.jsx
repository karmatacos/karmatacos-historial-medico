export default function EstadoBadge({ estado }) {
  const clase = estado === 'Confirmado' ? 'confirmado' : 'espera';
  return <span className={`estado ${clase}`}>{estado}</span>;
}
