import React from "react";
import { Card, CardContent } from "@/app/dashboard/card";
import { ArrowUp, ArrowDown } from "lucide-react";

interface ProgressBarProps {
  percentage: number;
  color: string;
}

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  iconColor: string;
  progressBar?: ProgressBarProps;
  tema: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  isPositive,
  icon,
  iconColor,
  progressBar,
  tema,
}) => {
  return (
    <Card className={`border-0 ${tema === "dark" ? "bg-gray-800/70" : "bg-white"} shadow-lg rounded-xl`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className={`text-sm font-medium ${tema === "dark" ? "text-gray-400" : "text-gray-500"}`}>{title}</p>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
            <div className="mt-1 flex flex-col">
              <p 
                className={`text-xs ${isPositive ? "text-green-500" : "text-red-500"} flex items-center font-medium`}
              >
                <span 
                  className={`flex items-center justify-center p-0.5 rounded-full ${
                    isPositive ? "bg-green-500/20" : "bg-red-500/20"
                  } mr-1`}
                >
                  {isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                </span>
                {change}
              </p>
              
              {/* Conditional rendering for progress bar */}
              {progressBar && (
                <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1.5 overflow-hidden">
                  <div 
                    className={`h-full ${progressBar.color} rounded-full`} 
                    style={{ width: `${progressBar.percentage}%` }}
                  ></div>
                </div>
              )}
            </div>
          </div>
          <div className={`p-3 rounded-xl ${iconColor}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};