import { useLoaderData } from "react-router-dom";

import { Award, Star, ExternalLink } from "lucide-react";


function BountyRewards() {
  const { data } = useLoaderData();

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-so-gray-300">
        <div className="px-6 py-4 border-b border-so-gray-300 bg-so-gray-100">
          <h2 className="text-xl font-semibold text-so-black">Bounty Rewards</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-so-gray-200">
            <thead className="bg-so-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-so-gray-600 uppercase tracking-wider">
                  Question ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-so-gray-600 uppercase tracking-wider">
                  Answer ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-so-gray-600 uppercase tracking-wider">
                  Reward Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-so-gray-600 uppercase tracking-wider">
                  Site
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-so-gray-600 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-so-gray-600 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-so-gray-200">
              {data.map((e, i) => (
                <tr
                  key={`${i}`}
                  className="hover:bg-so-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-so-black">
                    <div className="flex items-center">
                      <ExternalLink className="w-4 h-4 mr-2 text-so-gray-400" />
                      {e.questionId}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-so-black">
                    {e.answerId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    >
                      <Award className="w-4 h-4 mr-1" />
                      {e.rewardType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-so-black">
                    {e.site}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-so-black">
                      <Star className="w-4 h-4 mr-1 text-so-orange" />
                      {e.score}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-so-black">
                    {e.amount} STP
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

}

export default BountyRewards;
