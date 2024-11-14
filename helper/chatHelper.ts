
import { supabase as supabaseClient } from "~core/supabase"

export interface UserInfo {
  firstName: string;
  lastName: string;
  myself: string;
  github?: string;
  twitter?: string;
  medium?: string;
  portfolio?: string;
  leetcode?: string;
  codeforces?: string;
  atcoder?: string;
  codechef?: string;
  kaggle?: string;
  blogs?: string;
  created_at: string;
  currentfeed: string;
}



export const getUserData = async (userId: string): Promise<{ success: boolean; data?: UserInfo; error?: string }> => {
  try {
    const { data, error } = await supabaseClient
      .from('userinfo')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      return {
        success: false,
        error: 'User not found'
      };
    }

    return {
      success: true,
      data
    };

  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch user data'
    };
  }
};

export const getChatbotResponseFromCloudflare = async (
  userId:string,
  message: string
): Promise<string> => {
  try {

    const result = await getUserData(userId);
    if (result.error) {
      console.log(result.error)
      return;
    }
    console.log(result.data);
    let userWholeInfo = result.data

    // return ;
    const { data: cloudflareData } = await supabaseClient
      .from("cloudflare")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .single();

    console.log("Supabase response of asker:", cloudflareData);

    let cloudflareAccountId = process.env.PLASMO_PUBLIC_CLOUDFLARE_ACCOUNT_ID;
    let cloudflareAuthToken = process.env.PLASMO_PUBLIC_CLOUDFLARE_AUTH_TOKEN;


    if (cloudflareData) {
      const accountId = cloudflareData.CLOUDFLARE_ACCOUNT_ID?.trim();
      const authToken = cloudflareData.CLOUDFLARE_AUTH_TOKEN?.trim();
      
      cloudflareAccountId = accountId || cloudflareAccountId;
      cloudflareAuthToken = authToken || cloudflareAuthToken;
    }

    const cloudflareModelForChat = process.env.PLASMO_PUBLIC_CLOUDFLARE_MODEL_FOR_CHAT;

    if (!cloudflareAccountId || !cloudflareAuthToken || !cloudflareModelForChat) {
      throw new Error("Missing Cloudflare configuration");
    }

    const socialLinks = [
      userWholeInfo.github && `- GitHub: [${userWholeInfo.github}](${userWholeInfo.github})`,
      userWholeInfo.twitter && `- Twitter: [${userWholeInfo.twitter}](${userWholeInfo.twitter})`,
      userWholeInfo.medium && `- Medium: [${userWholeInfo.medium}](${userWholeInfo.medium})`,
      userWholeInfo.portfolio && `- Portfolio: [${userWholeInfo.portfolio}](${userWholeInfo.portfolio})`,
      userWholeInfo.leetcode && `- LeetCode: [${userWholeInfo.leetcode}](${userWholeInfo.leetcode})`,
      userWholeInfo.codeforces && `- CodeForces: [${userWholeInfo.codeforces}](${userWholeInfo.codeforces})`,
      userWholeInfo.atcoder && `- AtCoder: [${userWholeInfo.atcoder}](${userWholeInfo.atcoder})`,
      userWholeInfo.codechef && `- CodeChef: [${userWholeInfo.codechef}](${userWholeInfo.codechef})`,
      userWholeInfo.kaggle && `- Kaggle: [${userWholeInfo.kaggle}](${userWholeInfo.kaggle})`,
      userWholeInfo.blogs && `- Blogs: [${userWholeInfo.blogs}](${userWholeInfo.blogs})`
    ].filter(Boolean).join("\n");

    const socialLinksText = socialLinks || "No social links provided";

    const url = `https://api.cloudflare.com/client/v4/accounts/${cloudflareAccountId}/ai/run/${cloudflareModelForChat}`;
    const headers = {
      "Authorization": `Bearer ${cloudflareAuthToken}`,
      "Content-Type": "application/json",
    };

    const payload = {
      messages: [
        {
          role: "system",
          content: `You are the assistant of ${userWholeInfo.firstName} ${userWholeInfo.lastName}, ${userWholeInfo.myself}
  
            ** Some information about me is ${userWholeInfo.myself}
  
            He is eager to explore opportunities in exciting projects, whether as a full-time employee, an intern, or a freelancer. You can discover more about his work and connect with him through his online profiles:
            ${socialLinksText}
            Also this profile is created at ${userWholeInfo.created_at} and change this to normal timezone
            
            These are the previous chat with alfred ${userWholeInfo.currentfeed}`
        },
        { role: "user", content: message },
      ]
    };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed request: - ${response.status} - ${response.statusText}`);
      console.error(`Response content: ${errorText}`);
      throw new Error(`Cloudflare API error: ${errorText}`);
    }

    const responseData = await response.json();
    if ('result' in responseData && 'response' in responseData.result) {
      return responseData.result.response;
    }

    throw new Error("Unexpected response format from Cloudflare");

  } catch (error) {
    console.error("General exception:", error);
    throw error;
  }
};