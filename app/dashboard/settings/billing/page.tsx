import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BillingSettingsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>
            You are currently on the Free plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">Free Plan</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Basic features for getting started
                </p>
              </div>
              <span className="text-2xl font-bold">$0/mo</span>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-semibold mb-2">Features</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>✓ Up to 10 videos per month</li>
                <li>✓ Basic video generation</li>
                <li>✓ Social media scheduling</li>
                <li>✗ Advanced analytics</li>
                <li>✗ Priority support</li>
              </ul>
            </div>

            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              Upgrade to Pro
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>
            No payment method on file
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline">
            Add Payment Method
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>
            View your past invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No billing history available
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

