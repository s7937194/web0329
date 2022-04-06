import About from "./page/Home/About";
import Home from "./page/Home/Home";
import Roadmap from "./page/Home/Roadmap";
import Team from "./page/Home/Team";
import Showcase from "./page/Home/Showcase";
import Faq from "./page/Home/Faq";
import ScrollToTop from "./components/ScrollToTop";
import Tokenomics from "./page/Home/Tokenomics";
import Roarity from "./page/Home/Roarity";

function App() {
    return (
        <main>
            {/* <Suspense fallback={<Loading />}> */}
                <Home />
                <About />
                <Roadmap />
                <Tokenomics />
                <Roarity />
                <Showcase />
                <Team />
                <Faq />
                {/* <ScrollToTop scrollPosition={y}/> */}
                <ScrollToTop />{" "}
            {/* </Suspense> */}
        </main>
    );
}

export default App;
