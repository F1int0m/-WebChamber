import config from './config.json'
import {PROFILE_PAGE} from "../../../system/env";

export default function setupContentFeed (pageType, pathname) {
    try {
        let enableAddContentButton;
        let postType;

        // CHALLENGE_BANNER,
        // CHALLENGE
        // CASUAL
        // AUTHOR

        if (pageType === 'casual-chamber') {
            postType = 'CASUAL'
            enableAddContentButton = config.showButtons.addContent.Chamber_CasualPostsPage
        } else if (pageType === 'challenges-chamber') {
            postType = 'CHALLENGE'
            enableAddContentButton = config.showButtons.addContent.Chamber_ChallengesListPage
        } else if (pageType === 'challenge') {
            postType = 'CASUAL'
            enableAddContentButton = config.showButtons.addContent.Chamber_ChallengePage
        } else if (pageType === PROFILE_PAGE.CASUAL.TYPE.NOT_ME) {
            postType = 'CASUAL'
            enableAddContentButton = config.showButtons.addContent.Profile_CasualPostsPage
        } else if (pageType === PROFILE_PAGE.CASUAL.TYPE.ME) {
            postType = 'CASUAL'
            enableAddContentButton = config.showButtons.addContent.Profile_me_CasualPostsPage
        } else if (pageType === PROFILE_PAGE.CHALLENGES.TYPE) {
            postType = 'CHALLENGE'
            enableAddContentButton = config.showButtons.addContent.Profile_ChallengesPostsPage
        } else if (pageType === 'casual-favourites') {
            postType = 'CASUAL'
            enableAddContentButton = config.showButtons.addContent.Favourites_AllPostsPage
        } else if (pageType === 'challenges-favourites') {
            postType = 'CHALLENGE'
            enableAddContentButton = config.showButtons.addContent.Favourites_ChallengesListPage
        }
        else {
            throw new Error('setupContentFeed: there is no type of page like ' + pageType);
        }

        return {
            showButtons: {
                addContent: enableAddContentButton
            },
            postType: postType
        }
    } catch (e) {
        console.error(e);
    }
}