//package com.springboot.cinema.util;
//
//import com.springboot.cinema.model.Movie;
//import com.springboot.cinema.model.User;
//import com.springboot.cinema.payload.ChoiceResponse;
//import com.springboot.cinema.payload.PollResponse;
//import com.springboot.cinema.payload.UserSummary;
//
//import java.time.Instant;
//import java.util.List;
//import java.util.Map;
//import java.util.stream.Collectors;
//
//public class ModelMapper {
//
//    public static PollResponse mapPollToPollResponse(Movie poll, Map<Long, Long> choiceVotesMap, User creator, Long userVote) {
//        PollResponse pollResponse = new PollResponse();
//        pollResponse.setId(poll.getId());
//        pollResponse.setQuestion(poll.getQuestion());
//        pollResponse.setCreationDateTime(poll.getCreatedAt());
//        pollResponse.setExpirationDateTime(poll.getExpirationDateTime());
//        Instant now = Instant.now();
//        pollResponse.setExpired(poll.getExpirationDateTime().isBefore(now));
//
//        List<ChoiceResponse> choiceResponses = poll.getChoices().stream().map(choice -> {
//            ChoiceResponse choiceResponse = new ChoiceResponse();
//            choiceResponse.setId(choice.getId());
//            choiceResponse.setText(choice.getText());
//
//            if(choiceVotesMap.containsKey(choice.getId())) {
//                choiceResponse.setVoteCount(choiceVotesMap.get(choice.getId()));
//            } else {
//                choiceResponse.setVoteCount(0);
//            }
//            return choiceResponse;
//        }).collect(Collectors.toList());
//
//        pollResponse.setChoices(choiceResponses);
//        UserSummary creatorSummary = new UserSummary(creator.getId(), creator.getUsername(), creator.getName());
//        pollResponse.setCreatedBy(creatorSummary);
//
//        if(userVote != null) {
//            pollResponse.setSelectedChoice(userVote);
//        }
//
//        long totalVotes = pollResponse.getChoices().stream().mapToLong(ChoiceResponse::getVoteCount).sum();
//        pollResponse.setTotalVotes(totalVotes);
//
//        return pollResponse;
//    }
//
//}
