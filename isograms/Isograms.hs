import Data.List
import Data.Char
import Data.Function

-- Implementation
isogram :: (Ord a, Eq a) => [a] -> Bool
isogram = uniq . sort

uniq []  = True
uniq [_] = True
uniq (x:xs)
    | x == head xs = False
    | otherwise    = uniq xs

-- Utilities
wordList = "/usr/share/dict/words"
findIsos = filter (isogram . clean)
clean = filter isAlpha . map toLower
sortByLength = reverse . sortBy (compare `on` length)

-- Main method
printIsos = do
    l <- fmap isos $ readFile wordList
    mapM_ putStrLn l where
        isos = findIsos
            . (filter (all isAlpha))
            . sortByLength
            . lines

main = printIsos
