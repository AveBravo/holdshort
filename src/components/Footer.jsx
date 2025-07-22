import { Link } from "@heroui/react";
import {
  Twitter,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <Grid.Container
      as="footer"
      css={{
        background: "linear-gradient(180deg, #F0F4FA, #C4E0E5)",
        padding: "2rem",
        color: "#333",
      }}
    >
      <Grid xs={12} sm={6} css={{ marginBottom: "1rem" }}>
        <Col>
          <Text h4>Contact Us</Text>
          <Text>If you have any questions, comments, or suggestions, please feel free to contact us!</Text>
          <Text css={{ fontWeight: "bold", fontSize: "1.5rem" }}>
            <Phone style={{ marginRight: "0.5rem" }} /> (775) 364-0660
          </Text>
          <Link href="mailto:support@holdshort.com">
            <Mail style={{ marginRight: "0.5rem" }} /> support@holdshort.com
          </Link>
          <Link href="https://skype.com/holdshort.aviation" target="_blank">
            <MapPin style={{ marginRight: "0.5rem" }} /> Holdshort Aviation
          </Link>
        </Col>
      </Grid>

      <Grid xs={12} sm={6} css={{ textAlign: "right", marginBottom: "1rem" }}>
        <Col>
          <Text h4>Follow us:</Text>
          <div>
            <Link href="https://twitter.com" target="_blank">
              <Twitter style={{ margin: "0.5rem" }} />
            </Link>
            <Link href="https://facebook.com" target="_blank">
              <Facebook style={{ margin: "0.5rem" }} />
            </Link>
            <Link href="https://youtube.com" target="_blank">
              <Youtube style={{ margin: "0.5rem" }} />
            </Link>
          </div>
        </Col>
      </Grid>

      <Grid xs={12} css={{ justifyContent: "center", marginTop: "1rem" }}>
        <Text css={{ fontSize: "0.875rem", color: "#666", textAlign: "center" }}>
          &copy; {new Date().getFullYear()} Holdshort Aviation Systems, LLC. All Rights Reserved.
        </Text>
      </Grid>
    </Grid.Container>
  );
}
