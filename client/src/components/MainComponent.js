import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Header from "@/components/Header"; // Adjust the import path as necessary
import SettingsPage from "@/components/SettingsPage"; // Adjust the import path as necessary

const MainComponent = () => {
  const [instagramUrl, setInstagramUrl] = useState(localStorage.getItem("instagramUrl") || "");
  const [linkedinUrl, setLinkedinUrl] = useState(localStorage.getItem("linkedinUrl") || "");

  useEffect(() => {
    // Update localStorage whenever the state changes
    localStorage.setItem("instagramUrl", instagramUrl);
    localStorage.setItem("linkedinUrl", linkedinUrl);
  }, [instagramUrl, linkedinUrl]);

  return (
    <Box>
      <Header instagramUrl={instagramUrl} linkedinUrl={linkedinUrl} />
      <SettingsPage 
        instagramUrl={instagramUrl} 
        setInstagramUrl={setInstagramUrl} 
        linkedinUrl={linkedinUrl} 
        setLinkedinUrl={setLinkedinUrl} 
      />
    </Box>
  );
};

export default MainComponent;
