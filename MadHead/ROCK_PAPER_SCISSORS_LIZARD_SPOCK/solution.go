package main

import (
	"fmt"
	"strconv"
	"strings"
)

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/



func main() {

    var N int
    fmt.Scan(&N)
    signMap := make(map[int]string)
    winMap := make(map[int][]string)
    // playerList := make([]int, N)
    // winnerList := make([]int, N)
    playerList := []int{}
    winnerList := []int{}
    winEvent := func(winner int,loser int){
        winnerList = append(winnerList, winner)
        winMap[winner] = append(winMap[winner],strconv.Itoa(loser))
    }
    for i := 0; i < N; i++ {
        var NUMPLAYER int
        var SIGNPLAYER string
        fmt.Scan(&NUMPLAYER, &SIGNPLAYER)
        signMap[NUMPLAYER] = SIGNPLAYER
        playerList = append(playerList,NUMPLAYER)
    }

    for len(playerList) != 1 {
        for i := 0; i < len(playerList); i += 2 {
            switch signMap[playerList[i]] {
                case "R":
                    switch signMap[playerList[i+1]]{
                        case "R":
                            if(playerList[i] > playerList[i+1]){
                                winEvent(playerList[i+1],playerList[i])
                            }else{
                                winEvent(playerList[i],playerList[i+1])
                            }
                        case "P":
                            winEvent(playerList[i+1],playerList[i])
                        case "C":
                            winEvent(playerList[i],playerList[i+1])
                        case "L":
                            winEvent(playerList[i],playerList[i+1])
                        case "S":
                            winEvent(playerList[i+1],playerList[i])
                    }

                case "P":
                    switch signMap[playerList[i+1]]{
                        case "R":
                            winEvent(playerList[i],playerList[i+1])
                        case "P":
                            if(playerList[i] > playerList[i+1]){
                                winEvent(playerList[i+1],playerList[i])
                            }else{
                                winEvent(playerList[i],playerList[i+1])
                            }
                        case "C":
                            winEvent(playerList[i+1],playerList[i])
                        case "L":
                            winEvent(playerList[i+1],playerList[i])
                        case "S":
                            winEvent(playerList[i],playerList[i+1])
                    }
                case "C":
                    switch signMap[playerList[i+1]]{
                        case "R":
                            winEvent(playerList[i+1],playerList[i])
                        case "P":
                            winEvent(playerList[i],playerList[i+1])
                        case "C":
                            if(playerList[i] > playerList[i+1]){
                                winEvent(playerList[i+1],playerList[i])
                            }else{
                                winEvent(playerList[i],playerList[i+1])
                            }
                        case "L":
                            winEvent(playerList[i],playerList[i+1])
                        case "S":
                            winEvent(playerList[i+1],playerList[i])
                    }
                case "L":
                    switch signMap[playerList[i+1]]{
                        case "R":
                            winEvent(playerList[i+1],playerList[i])
                        case "P":
                            winEvent(playerList[i],playerList[i+1])
                        case "C":
                            winEvent(playerList[i+1],playerList[i])
                        case "L":
                            if(playerList[i] > playerList[i+1]){
                                winEvent(playerList[i+1],playerList[i])
                            }else{
                                winEvent(playerList[i],playerList[i+1])
                            }
                        case "S":
                            winEvent(playerList[i],playerList[i+1])
                    }
                case "S":
                    switch signMap[playerList[i+1]]{
                        case "R":
                            winEvent(playerList[i],playerList[i+1])
                        case "P":
                            winEvent(playerList[i+1],playerList[i])
                        case "C":
                            winEvent(playerList[i],playerList[i+1])
                        case "L":
                            winEvent(playerList[i+1],playerList[i])
                        case "S":
                            if(playerList[i] > playerList[i+1]){
                                winEvent(playerList[i+1],playerList[i])
                            }else{
                                winEvent(playerList[i],playerList[i+1])
                            }
                    }
            }

        }
        playerList = winnerList
        winnerList = nil
    }

    for k:= range playerList {
        fmt.Println(playerList[k])
        fmt.Print(strings.Join(winMap[playerList[k]][:]," "))
    }

}
