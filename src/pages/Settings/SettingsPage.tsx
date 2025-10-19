import { Button } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
export default function ProfilePage() {
  const { user } = useAuth();
    const navigate = useNavigate();
  return (
    <div>
      {user ? (
        <>
          <h2>{user.username}</h2>
          <p>Email: {user.email}</p>
          <p>Abonnement: {user.subscription || "Free"}</p>
        </>
      ) : (<>
        <p>Vous n'êtes pas connecté.</p>
        <Button variant="primary" onClick={() => navigate("/login")}>
            Se connecter
        </Button></>
      )}
    </div>
  );
}
