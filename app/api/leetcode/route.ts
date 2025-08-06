import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username') || 'Soubhik_roy';

    try {
        const combinedQuery = {
            query: `
                query getCombinedUserProfile($username: String!) {
                    matchedUser(username: $username) {
                        username
                        submitStats: submitStatsGlobal {
                            acSubmissionNum {
                                difficulty
                                count
                            }
                        }
                        profile {
                            ranking
                        }
                        userCalendar {
                            submissionCalendar
                        }
                        languageProblemCount {
                            languageName
                            problemsSolved
                        }
                    }
                }
            `,
            variables: { username }
        };

        const response = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://leetcode.com'
            },
            body: JSON.stringify(combinedQuery),
            // REPLACE the 'next' object with this:
            cache: 'no-store'
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('GraphQL API responded with an error:', response.status, errorBody);
            throw new Error(`Failed to fetch LeetCode data. Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.errors) {
            console.error('GraphQL errors:', result.errors);
            const userNotFound = result.errors.some((e: any) => e.message.includes("User not found"));
            if (userNotFound) {
                return NextResponse.json(
                    { error: `User with username '${username}' not found.` },
                    { status: 404 }
                );
            }
            throw new Error('GraphQL query returned errors');
        }

        const { matchedUser } = result.data;

        if (!matchedUser) {
            return NextResponse.json(
                { error: `User with username '${username}' not found.` },
                { status: 404 }
            );
        }

        const processedData = {
            profile: {
                ...matchedUser,
                streak: 263
            },
            languages: matchedUser?.languageProblemCount || [],
            calendar: matchedUser?.userCalendar?.submissionCalendar || "{}"
        };

        return NextResponse.json(processedData);
    } catch (error) {
        console.error('Error in LeetCode API route:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'A server-side error occurred.' },
            { status: 500 }
        );
    }
}

export const dynamic = 'force-dynamic';