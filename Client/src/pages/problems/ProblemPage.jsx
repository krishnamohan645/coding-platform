import { useParams } from 'react-router-dom';
import ProblemDetail from './ProblemDetail';

export default function ProblemPage() {
  const { id } = useParams();

  return <ProblemDetail problemId={id} />;
}
