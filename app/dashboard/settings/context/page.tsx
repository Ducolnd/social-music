import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ContextSettingsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Branding Context</CardTitle>
          <CardDescription>
            Provide context about your music brand and style preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="genre">Music Genre</Label>
              <Input
                id="genre"
                placeholder="e.g., Electronic, Hip-Hop, Rock"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="style">Visual Style</Label>
              <Input
                id="style"
                placeholder="e.g., Minimalist, Vibrant, Dark"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand Colors</Label>
              <Input
                id="brand"
                placeholder="e.g., #8B5CF6, #3B82F6"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit">
                Save Context
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

