import { useState, useEffect } from "react";
import { Cat, Heart, Info, Paw, Moon, Sun, ChevronUp, Palette, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const catBreeds = [
  { name: "Siamese", description: "Known for their distinctive markings and vocal nature.", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
  { name: "Persian", description: "Recognized for their long fur and flat faces.", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg" },
  { name: "Maine Coon", description: "One of the largest domesticated cat breeds with a distinctive physical appearance.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG" },
  { name: "British Shorthair", description: "Known for their chunky bodies, dense coat and broad faces.", image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Britishblue.jpg" },
  { name: "Scottish Fold", description: "Characterized by a gene mutation that affects cartilage throughout the body, giving the ears a 'folded' appearance.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Adult_Scottish_Fold.jpg" },
];

const catFacts = [
  "Cats sleep for about 70% of their lives.",
  "A group of cats is called a clowder.",
  "Cats have over 20 vocalizations, including the meow.",
  "The first cat in space was a French cat named Felicette in 1963.",
  "Cats have a third eyelid called the nictitating membrane.",
];

const catQuizQuestions = [
  {
    question: "What is a group of cats called?",
    options: ["A pride", "A clowder", "A pack", "A herd"],
    correctAnswer: "A clowder"
  },
  {
    question: "How many hours do cats typically sleep in a day?",
    options: ["8-10 hours", "12-14 hours", "16-20 hours", "22-23 hours"],
    correctAnswer: "16-20 hours"
  },
  {
    question: "Which of these is NOT a cat breed?",
    options: ["Siamese", "Persian", "Labrador", "Maine Coon"],
    correctAnswer: "Labrador"
  }
];

const themes = {
  light: "bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100",
  dark: "bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900",
  nature: "bg-gradient-to-br from-green-100 via-emerald-200 to-teal-300",
  sunset: "bg-gradient-to-br from-orange-100 via-red-200 to-pink-300",
  ocean: "bg-gradient-to-br from-blue-200 via-cyan-200 to-teal-200"
};

const Index = () => {
  const [likes, setLikes] = useState(0);
  const [currentFact, setCurrentFact] = useState(0);
  const [theme, setTheme] = useState("light");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizProgress, setQuizProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % catFacts.length);
    }, 5000);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLike = () => {
    setLikes(likes + 1);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    toast({
      title: "Thanks for the love!",
      description: `This page has been liked ${likes + 1} times.`,
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizAnswer = (answer) => {
    const isCorrect = answer === catQuizQuestions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: "Great job!",
      });
    } else {
      toast({
        title: "Incorrect",
        description: `The correct answer was: ${catQuizQuestions[currentQuestion].correctAnswer}`,
        variant: "destructive",
      });
    }

    if (currentQuestion < catQuizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setQuizProgress(((currentQuestion + 1) / catQuizQuestions.length) * 100);
    } else {
      setQuizStarted(false);
      setQuizProgress(100);
      const finalScore = score + (isCorrect ? 1 : 0);
      toast({
        title: "Quiz Completed!",
        description: `Your score: ${finalScore}/${catQuizQuestions.length}`,
      });
      if (finalScore === catQuizQuestions.length) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    }
  };

  return (
    <div className={`min-h-screen p-8 transition-all duration-500 ${themes[theme]}`}>
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <lottie-player
            src="https://assets2.lottiefiles.com/packages/lf20_u4yrau.json"
            background="transparent"
            speed="1"
            style={{width: "100%", height: "100%"}}
            loop
            autoplay
          ></lottie-player>
        </div>
      )}
      <Card className={`max-w-4xl mx-auto shadow-2xl ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white"}`}>
        <CardHeader>
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle className="text-5xl font-bold flex items-center justify-center">
              <Cat className={`mr-2 ${theme === "light" ? "text-purple-600" : "text-purple-400"}`} /> 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                All About Cats
              </span>
            </CardTitle>
            <CardDescription className={`text-center text-xl mt-2 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              Discover the fascinating world of our feline friends
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent>
          <Carousel className="mb-8">
            <CarouselContent>
              {catBreeds.map((breed, index) => (
                <CarouselItem key={index}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="relative overflow-hidden rounded-xl shadow-2xl"
                  >
                    <img
                      src={breed.image}
                      alt={breed.name}
                      className="mx-auto object-cover w-full h-[400px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                      <h3 className="text-white text-2xl font-bold mb-2">{breed.name}</h3>
                      <p className="text-white text-sm">{breed.description}</p>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <AnimatePresence mode="wait">
            <motion.p
              key={currentFact}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`text-xl ${theme === "dark" ? "text-gray-300" : "text-gray-700"} mb-6 text-center italic`}
            >
              "{catFacts[currentFact]}"
            </motion.p>
          </AnimatePresence>
          <Tabs defaultValue="characteristics" className="mb-8">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
              <TabsTrigger value="breeds">Popular Breeds</TabsTrigger>
              <TabsTrigger value="quiz">Cat Quiz</TabsTrigger>
            </TabsList>
            <TabsContent value="characteristics">
              <Card className={`${theme === "dark" ? "bg-gray-700" : "bg-white"} shadow-lg`}>
                <CardHeader>
                  <CardTitle className={`${theme === "dark" ? "text-white" : "text-gray-800"} text-2xl`}>Characteristics of Cats</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className={`list-none space-y-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    {["Excellent hunters with sharp claws and teeth", "Flexible bodies and quick reflexes", "Keen senses, especially their night vision", "Communicate through vocalizations, body language, and scent"].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center bg-gradient-to-r from-purple-100 to-pink-100 p-3 rounded-lg shadow"
                      >
                        <Paw className="mr-3 h-6 w-6 text-purple-500" /> {item}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="breeds">
              <Card className={`${theme === "dark" ? "bg-gray-700" : "bg-white"} shadow-lg`}>
                <CardHeader>
                  <CardTitle className={`${theme === "dark" ? "text-white" : "text-gray-800"} text-2xl`}>Popular Cat Breeds</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {catBreeds.map((breed, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`flex items-start p-4 rounded-lg ${theme === "dark" ? "bg-gray-600" : "bg-gray-100"}`}
                      >
                        <Info className={`mr-3 h-6 w-6 ${theme === "dark" ? "text-blue-400" : "text-blue-500"} mt-1`} />
                        <div>
                          <span className={`font-semibold text-lg ${theme === "dark" ? "text-white" : "text-gray-800"}`}>{breed.name}</span>
                          <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>{breed.description}</p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="quiz">
              <Card className={`${theme === "dark" ? "bg-gray-700" : "bg-white"} shadow-lg`}>
                <CardHeader>
                  <CardTitle className={`${theme === "dark" ? "text-white" : "text-gray-800"} text-2xl`}>Cat Trivia Quiz</CardTitle>
                </CardHeader>
                <CardContent>
                  {!quizStarted ? (
                    <Button onClick={() => { setQuizStarted(true); setQuizProgress(0); }} className="w-full py-6 text-lg">
                      <Sparkles className="mr-2 h-5 w-5" /> Start Quiz
                    </Button>
                  ) : (
                    <div>
                      <h3 className={`text-xl font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                        {catQuizQuestions[currentQuestion].question}
                      </h3>
                      <div className="space-y-3">
                        {catQuizQuestions[currentQuestion].options.map((option, index) => (
                          <Button
                            key={index}
                            onClick={() => handleQuizAnswer(option)}
                            variant="outline"
                            className={`w-full text-left justify-start py-4 text-lg ${theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-100"}`}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                      <Progress value={quizProgress} className="mt-6" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <motion.p 
            className={`text-xl ${theme === "dark" ? "text-gray-300" : "text-gray-700"} mb-8 text-center`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Whether you're a cat owner or just an admirer, these furry friends continue to captivate us with their charm and personality.
          </motion.p>
          <div className="flex justify-center space-x-6">
            <Button 
              onClick={handleLike} 
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-3 rounded-full shadow-lg transform transition hover:scale-105"
            >
              <Heart className="mr-2 h-5 w-5" /> Like This Page
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className={`${theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-800"} px-6 py-3 rounded-full shadow-lg transform transition hover:scale-105`}
                >
                  <Palette className="mr-2 h-5 w-5" /> Change Theme
                </Button>
              </DialogTrigger>
              <DialogContent className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"} rounded-xl`}>
                <DialogHeader>
                  <DialogTitle className="text-2xl">Choose a theme</DialogTitle>
                  <DialogDescription>Select a theme for the cat page</DialogDescription>
                </DialogHeader>
                <RadioGroup defaultValue={theme} onValueChange={setTheme} className="grid grid-cols-2 gap-4">
                  {Object.keys(themes).map((themeKey) => (
                    <div key={themeKey} className="flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 p-3 rounded-lg">
                      <RadioGroupItem value={themeKey} id={themeKey} />
                      <Label htmlFor={themeKey} className="text-lg">{themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </DialogContent>
            </Dialog>
          </div>
          <div className="mt-8 text-center">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Likes: {likes}
            </Badge>
          </div>
        </CardContent>
      </Card>
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8"
          >
            <Button onClick={scrollToTop} className="rounded-full p-3">
              <ChevronUp className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
