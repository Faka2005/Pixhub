import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

type AvatarProps = {
  img: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg" | "xl" | string; // permet des tailles prédéfinies ou personnalisées (ex: "80px")
};

export default function Avatar({ img, onClick, size = "md" }: AvatarProps) {
  // ✅ Définition des tailles standards
  const sizeMap: Record<string, string> = {
    sm: "40px",
    md: "64px",
    lg: "96px",
    xl: "128px",
  };

  const finalSize = sizeMap[size] || size; // si tu passes directement "80px", ça marche aussi

  return (
    <Container>
      <Row>
        <Col xs={6} md={4}>
          <Image
            src={img}
            roundedCircle
            onClick={onClick}
            style={{
              cursor: onClick ? "pointer" : "default",
              width: finalSize,
              height: finalSize,
              objectFit: "cover",
            }}
          />
        </Col>
      </Row>
    </Container>
  );
}
